import { Injectable } from '@angular/core';


@Injectable()
export class AppConsts {
    readonly MESSAGES = {
        ADD_HERO: 'Add a new hero using this dialog',
        LOGGED_IN_SUCCESS: 'You are not logged in!'
    }
}