import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestinationCardComponent } from '../destination-card/destination-card.component';
import { Destination } from '../../models/destination';

@Component({
  selector: 'app-destination-list',
  standalone: true,
  imports: [CommonModule, DestinationCardComponent],
  templateUrl: './destination-list.component.html'
})
export class DestinationListComponent {
  @Input() list: Destination[] = [];
}
