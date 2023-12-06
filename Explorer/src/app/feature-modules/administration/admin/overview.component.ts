import { Component, OnInit } from '@angular/core';
import { AdministrationService } from '../administration.service';
import { Overview } from '../model/overview.model';
import { Wallet } from '../../marketplace/model/wallet.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'xp-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  constructor(private service: AdministrationService, private fb: FormBuilder) { }

  users: Overview[] = [];
  selectedUser: Overview | null = null;
  wallets: Wallet[] = [];
  selectUserForCoinsAddition: Overview | null = null;
  coinAdditionForm: FormGroup;

  ngOnInit(): void {
    this.coinAdditionForm = this.fb.group({
      coinAmount: [0, Validators.required]
    })
    this.loadUsers();
  }

  loadUsers(){
    // Call the method to get all users
    this.service.getAllWallets().subscribe({
      next: response => {
        this.wallets = response.results;
        console.log(this.wallets);
        this.service.getAllUsers().subscribe({
          next: (data) => {
            console.log('Received users:', data.value);

            data.value.forEach((user: Overview) => {
              const wallet = this.wallets.find((w) => w.userId == user.userId);
              if (wallet == undefined) {
                user.coins = 0;
              }
              else {
                user.coins = wallet.coins;
              }

            })
            this.users = data.value;
          },
          error: (error) => {
            console.error(error);
            alert(error.error.message);
          }
        });
      }
    })

  }

  selectUser(user: Overview): void {
    this.selectedUser = user;
  }

  blockSelectedUser(): void {
    if (this.selectedUser) {

      this.service.blockUser(this.selectedUser.username).subscribe(
        (response) => {
          console.log('User blocked successfully:', response);

          this.users = this.users.filter((user) => user !== this.selectedUser);
          this.selectedUser = null;
        },
        (error) => {
          console.error('Error blocking the user:', error.message);

        }
      );
    } else {
      console.error("No user selected for blocking.");

    }
  }

  onAddCoinsClicked(user: Overview) {
    this.selectUserForCoinsAddition = user;
  }

  addCoins() {
    const coins = this.coinAdditionForm.value.coinAmount;
    if (this.coinAdditionForm.valid && coins > 0 && this.selectUserForCoinsAddition != undefined) {
      this.service.addCoins(this.selectUserForCoinsAddition?.userId, coins).subscribe({
        next: response => {
          console.log(response);
          this.loadUsers();
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }

  onModalClose() {
    this.selectUserForCoinsAddition = null;
    this.coinAdditionForm.patchValue({
      coinAmount: 0,
    });
  }

}
