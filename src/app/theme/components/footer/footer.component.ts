import { Component, OnInit } from '@angular/core';
import { AppState } from '../../../app.state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public date;
  public format;

  constructor(
    private _state: AppState,
  ) { 
    this.format = "yyyy";
    this.date =  new Date(); 
    this._state.subscribe('commentBox.reply', (data) => {

      if (!data.hideCommentBox) {
        jQuery("footer").slideUp();
      } else {
        jQuery("footer").slideDown();
      }
    });
  } 

  ngOnInit() {
  }

}
