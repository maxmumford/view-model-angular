import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, UserService, getUserNameFn } from '../user-table.types';

interface VM {
    users: User[];
    hiddenUserIds: number[];
}

@Component({
    selector: 'app-user-table-vm-push',
    templateUrl: './user-table-vm-push.component.html',
    styleUrls: ['./user-table-vm-push.component.scss'],
    providers: [UserService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTableComponent implements OnInit {

    getUserName = getUserNameFn;
    vm$: Observable<VM>;

    private sort = new BehaviorSubject<keyof User>('name');
    private hiddenUserIds = new BehaviorSubject<number[]>([]);

    constructor(
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.vm$ = combineLatest([
            this.userService.selectUsersFromStore(),
            this.sort,
            this.hiddenUserIds,
        ]).pipe(
            map(([users, sort, hiddenUserIds]) => {

                users = users.filter(u => !hiddenUserIds.includes(u.id));

                const vm: VM = {
                    users: this.sortUsers(sort, users),
                    hiddenUserIds,
                };

                return vm;
            })
        );
    }

    getCssClassForTable(): string {
        /** ... */
        return '';
    }

    setSort(sort: keyof User) {
        this.sort.next(sort);
    }

    sortUsers(sort: keyof User, users: User[]) {
        return users.sort(/** ... */);
    }

    hideUser(id: number) {
        this.hiddenUserIds.next([...this.hiddenUserIds.value, id]);
    }
}
