import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { D3OrgChartComponent } from './d3-org-chart/d3-org-chart.component';
import { NodeContentComponent } from './node-content/node-content.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [BrowserModule, FormsModule, CommonModule],
  declarations: [
    AppComponent,
    HelloComponent,
    D3OrgChartComponent,
    NodeContentComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
