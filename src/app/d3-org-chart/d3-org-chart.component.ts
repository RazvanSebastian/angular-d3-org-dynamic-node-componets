import {
  OnChanges,
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  EmbeddedViewRef,
  AfterViewInit,
  SimpleChanges,
  ComponentFactoryResolver,
} from '@angular/core';

import { OrgChart } from 'd3-org-chart';
import { NodeContentComponent } from '../node-content/node-content.component';

@Component({
  selector: 'app-d3-org-chart',
  templateUrl: './d3-org-chart.component.html',
  styleUrls: ['./d3-org-chart.component.css'],
})
export class D3OrgChartComponent implements AfterViewInit {
  @ViewChild('chartContainer') chartContainer: ElementRef;

  data: any[] = [
    { customId: 1, customParentId: null, customName: 'node1' },
    { customId: 2, customParentId: 1, customName: 'node2' },
    { customId: 3, customParentId: 1, customName: 'node3' },
  ];
  chart: OrgChart<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngAfterViewInit(): void {
    this.chart = new OrgChart()
      .container(this.chartContainer.nativeElement)
      .data(this.data)
      .nodeId((dataItem) => dataItem.customId)
      .parentNodeId((dataItem) => dataItem.customParentId)
      .nodeWidth((d) => 200)
      .nodeHeight((d) => 120)
      .nodeContent((node) => {
        return `<div slot=${node.data.customId}></div>`;
      })
      .render();

    /* Requires a delay because we are changing the inputs after the first check of the angular
    ExpressionChangedAfterItHasBeenCheckedError  */
    setTimeout(() => {
      const factory =
        this.resolver.resolveComponentFactory(NodeContentComponent);

      this.data.forEach((item) => {
        const componentRef = this.viewContainerRef.createComponent(factory);
        componentRef.instance.text = item.customName;

        const nodeContentEl = (
          componentRef.hostView as EmbeddedViewRef<NodeContentComponent>
        ).rootNodes[0] as HTMLElement;

        const slot = document.querySelector(`div[slot='${item.customId}']`);
        slot.appendChild(nodeContentEl);
      }, 100);
    });
  }
}
