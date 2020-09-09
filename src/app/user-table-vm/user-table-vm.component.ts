import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserService, getUserNameFn } from '../user-table.types';

interface VM {
    users: User[];
    hiddenUserIds: number[];
}

@Component({
    selector: 'app-user-table',
    templateUrl: './user-table-vm.component.html',
    styleUrls: ['./user-table-vm.component.scss'],
    providers: [UserService],
})
export class UserTableComponent implements OnInit {

    getUserName = getUserNameFn;
    vm$: Observable<VM>; // 2

    private sort = new BehaviorSubject<keyof User>('name');
    private hiddenUserIds = new BehaviorSubject<number[]>([]);

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.vm$ = combineLatest([ // 1 & 3
            this.userService.selectUsersFromStore(),
            this.sort,
            this.hiddenUserIds,
        ]).pipe(
            map(([users, sort, hiddenUserIds]) => {

                users = users.filter(u => !hiddenUserIds.includes(u.id));
                users = this.sortUsers(sort, users);

                const vm: VM = {
                    users,
                    hiddenUserIds,
                };

                return vm;
            }),
        );
    }

    getCssClassForTable(): string {
        /** ... */
        return '';
    }

    setSort(sort: keyof User) { // 4
        this.sort.next(sort);
    }

    sortUsers(sort: keyof User, users: User[]) {
        return users.sort(/** ... */);
    }

    hideUser(id: number) {
        this.hiddenUserIds.next([...this.hiddenUserIds.value, id]);
    }
}
