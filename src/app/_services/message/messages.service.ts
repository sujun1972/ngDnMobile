import {Injectable} from '@angular/core'
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { AuthenticationService } from '../authentication/authentication.service';
import { ServiceSettings } from '../sevice-settings'

@Injectable()
export class MessagesService {
    private _messageListApiURL = ServiceSettings.API_ENDPOINT + "/list/MessageList";
    private _messages = [
        {
            type: "reply",
            author: 'michael',
            authorLevel: 'superVip',
            image: 'assets/img/users/user.png',
            action: '给你的评论点了赞',
            text: '',
            quote: '小编大赞 这更新速度没人能比啊！！！看到下面有朋友说会跟国外朋友一起看的，不知道有没有人跟我一样，我个人不愿意分享多瑙这么好的网站给歪果仁，因为总是莫名地好担心他们会去举报版权之类的。网站这么好，我要好好保护它。',
            published: '刚刚',
            link: '/pages/video',
        },
        {
            type: "reply",
            author: '史太郎',
            authorLevel: '',
            image: 'assets/img/users/user.png',
            action: '回复了您的评论',
            text: '从第一季就开始追的朋友请点赞',
            quote: '小编大赞 这更新速度没人能比啊！！！看到下面有朋友说会跟国外朋友一起看的，不知道有没有人跟我一样，我个人不愿意分享多瑙这么好的网站给歪果仁，因为总是莫名地好担心他们会去举报版权之类的。网站这么好，我要好好保护它。',
            published: '3分钟前',
            link: '/pages/video',
        },
        {
            type: "reply",
            author: '陈胜',
            authorLevel: 'Vip',
            image: 'assets/img/profile/julia.jpg',
            action: '回复了您的评论',
            text: '琼恩是龙母他大哥与艾德史塔克的妹妹的孩子，龙母大哥就是当时皇太子，所以琼恩是皇室正统中的正统，也就是龙母是琼恩的亲姑姑，艾德史塔克是他亲舅舅。所以艾德史塔克活着的时候经常说琼恩是他血脉也是没错的',
            quote: '小编大赞 这更新速度没人能比啊！！！看到下面有朋友说会跟国外朋友一起看的，不知道有没有人跟我一样，我个人不愿意分享多瑙这么好的网站给歪果仁，因为总是莫名地好担心他们会去举报版权之类的。网站这么好，我要好好保护它。',
            published: '13分钟前',
            link: '/pages/video',
        },
        {
            type: "system",
            author: '系统消息',
            authorLevel: '',
            image: 'assets/img/profile/ashley.jpg',
            action: '您收到500个金币',
            text: '帐号绑定邮箱奖励',
            quote: '',
            published: '2小时前',
            link: '/pages/messages',
        },
        {
            type: "system",
            author: '系统消息',
            authorLevel: '',
            image: 'assets/img/profile/ashley.jpg',
            action: '您的帐号充值成功',
            text: 'VIP有效期到2017年12月24日',
            quote: '',
            published: '15天前',
            link: '/pages/messages',
        },
        {
            type: "comment",
            author: '',
            authorLevel: '',
            image: 'assets/img/profile/ashley.jpg',
            action: '您发布了评论',
            text: '小编大赞 这更新速度没人能比啊！！！看到下面有朋友说会跟国外朋友一起看的，不知道有没有人跟我一样，我个人不愿意分享多瑙这么好的网站给歪果仁，因为总是莫名地好担心他们会去举报版权之类的。网站这么好，我要好好保护它。',
            quote: '冰与火之歌 - 权力的游戏 第7季',
            published: '20天前',
            link: '/pages/video',
        },
    ];

    private _notifications = [
        {
            name: 'michael',
            text: 'Michael posted a new article.',
            time: '1 min ago'
        },
        {
            name: 'adam',
            text: 'Adam changed his contact information.',
            time: '2 hrs ago'
        },
        {
            image: '../assets/img/shopping-cart.svg',
            text: 'New orders received.',
            time: '5 hrs ago'
        },
        {
            name: 'ashley',
            text: 'Ashley replied to your comment.',
            time: '1 day ago'
        },
        {
            name: 'tereza',
            text: 'Today is Tereza\'s birthday.',
            time: '2 days ago'
        },
        {
            image: '../assets/img/comments.svg',
            text: 'New comments on your post.',
            time: '3 days ago'
        },
        {
            name: 'bruno',
            text: 'Bruno invited you to join the event.',
            time: '1 week ago'
        }
    ];

    constructor(
        private http: Http,
        private authenticationService: AuthenticationService
      ) {
    }

    public getMessages(type=0, pager=1): Promise<any[]> {
        let headers = new Headers();
        headers.append('Content-Type', this.authenticationService.token);
        let options = new RequestOptions({ headers: headers });
        let url = this._messageListApiURL + "?type=" + type + "&page=" + pager + "&token=" + this.authenticationService.token;
        return this.http.get(url)
        .toPromise()
        .then(
          response => {
            return response.json().data.info;
          } 
        )
        .catch(this.handleError);
      }

    public getMessagesByType(messageType):Array<Object> {
        if (messageType == "All") {
            return this._messages;
        } else {
            return this._messages.filter(item => item.type == messageType);
        }
    }

    public getNotifications():Array<Object> {
        return this._notifications;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}