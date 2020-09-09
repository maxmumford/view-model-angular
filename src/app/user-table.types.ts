import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UserService {
    selectUsersFromStore(): Observable<User[]> { return null; }
    deleteUser(id: number): Observable<any> { return null; }
}

export const getUserNameFn = null;
