import {config} from '../../config';
import {Page, NavController, NavParams} from 'ionic-angular';
import {QuestionPage} from '../question/question';


@Page({
  templateUrl: 'build/pages/questions/questions.html'
})
export class QuestionsPage {

  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    let request = new Request(config.apiRoot+'/questions', {
      method: 'GET',
      // mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });

    let page = this;
    fetch(request)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log('data', data);
      page.questions = data.response;
      page.selectedItem = 0;
    })
    .catch(function(error) {
      console.error('fail', error);
    });

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.nav.push(QuestionPage, {
      item: item
    });
  }

}
