import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { getUserNameFn, User, UserService } from '../user-table.types';

@UntilDestroy()
@Component({
    selector: 'app-user-table',
    templateUrl: './user-table.component.html',
    styleUrls: ['./user-table.component.scss'],
    providers: [UserService],
})
export class UserTableComponent implements OnInit {

    users: User[]; // 4
    sort: keyof User; // 4
    hiddenUsers: number[]; // 4
    getUserName = getUserNameFn; // 2

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.userService.selectUsersFromStore().pipe(
            untilDestroyed(this), // 7
        ).subscribe(u => { // 1 & 6
            u = this.users.filter(user => !this.hiddenUsers.includes(user.id));
            this.users = this.sortUsers(this.sort, u);
        });
    }

    getCssClassForTable(): string { // 3
        /** ... */
        return '';
    }

    setSort(sort: keyof User) {
        this.sort = sort;
        this.users = this.sortUsers(this.sort, this.users);
    }

    sortUsers(sort: keyof User, users: User[]) { // 3
        return users.sort(/** ... */);
    }

    hideUser(id: number) { // 5
        this.hiddenUsers.push(id);
        this.users = this.users.filter(u => u.id !== id);
    }
}
