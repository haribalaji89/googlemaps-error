
import { Component, HostListener} from '@angular/core';
//declare var gtag: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // CR-586 Session Handling Service
  @HostListener('window:unload', ['$event'])
  unloadHandler() {
    localStorage.setItem('sessionActive', 'false')
  }
  
}
