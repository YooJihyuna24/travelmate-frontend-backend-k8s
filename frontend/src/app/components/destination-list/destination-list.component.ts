import { Component, Input } from '@angular/core';
import { Destination } from '../../models/destination';

@Component({
  selector: 'app-destination-list',
  templateUrl: './destination-list.component.html',
  styleUrls: ['./destination-list.component.scss']
})
export class DestinationListComponent {
  @Input() list: Destination[] = [];
}
