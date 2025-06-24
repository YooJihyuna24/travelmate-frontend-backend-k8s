import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Destination } from '../../models/destination';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destination-card.component.html',
  styleUrls: ['./destination-card.component.scss']
})
export class DestinationCardComponent {
  @Input() data!: Destination;
}
