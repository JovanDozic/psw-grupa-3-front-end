import { Completer } from "./completer.model";
import { Participant } from "./participant.model";
import { Location} from "./location.model";

export enum EncounterType
{
    Social = 1,
    Location,
    Misc
}

export enum EncounterStatus
{
    Draft = 1,
    Active,
    Archieved
}

export interface Encounter{

    id?: number,
    name: string,
    description: string,
    location: Location,
    experience: number,
    status: EncounterStatus,
    type: EncounterType,
    participants: Participant[],
    completers: Completer[]
}

