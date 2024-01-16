import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-node-content',
  templateUrl: './node-content.component.html',
  styleUrls: ['./node-content.component.css'],
})
export class NodeContentComponent implements OnInit {
  @Input()
  text: string;

  constructor() {}

  ngOnInit() {}
}
