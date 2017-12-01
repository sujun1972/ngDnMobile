import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../../_services/user/user.service'
import { MessagesService } from '../../../_services/message/messages.service';

@Component({
    selector: 'dn-messages',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./messages.component.scss'],
    templateUrl: './messages.component.html',
    providers: [MessagesService],
    // host: {'class': 'hide-ip5'}
})

export class MessagesComponent{
    private user;
    public messages:Array<Object>;
    public notifications:Array<Object>;

    constructor (
        private _messagesService:MessagesService,
        private _userService: UserService,
    ){
        // this.messages = _messagesService.getMessages();
        //this.notifications = _messagesService.getNotifications();
    }

    ngOnInit() {
        this._userService.getUsers().subscribe(user => {
            this.user = user;
        })
    }
}