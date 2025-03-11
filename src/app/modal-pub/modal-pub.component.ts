import { Component } from '@angular/core';

interface Type {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-modal-pub',
  templateUrl: './modal-pub.component.html',
  styleUrls: ['./modal-pub.component.css']
})


export class ModalPubComponent {
  selectedValue !: string;
  types: Type[] = [
    {value: 'Conf', viewValue: 'Conf'},
    {value: 'Journal', viewValue: 'Journal'},
    {value: 'Magazine', viewValue: 'Magazine'},
  ];
}
