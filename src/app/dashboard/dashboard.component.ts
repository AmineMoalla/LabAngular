import { Component } from '@angular/core';
import { ArticleService } from 'src/services/article.service';
import { EventService } from 'src/services/event.service';
import { MemberService } from 'src/services/member.service';
import { PubService } from 'src/services/pub.service';
import { ToolService } from 'src/services/tool.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  NB_Members = 0;
  NB_Events = 0;
  NB_Articles = 0;
  NB_Tools = 0;
  NB_Etudiant = 0;
  NB_Admin = 0;
  NB_Tunis = 0;
  NB_Sfax = 0;

  tab_names: string[] = [];
  tab_events: number[] = [];
  tab_eventss: string[] = [];

  chartDataPie: ChartDataset[] = [{ label: 'Type Membres', data: [] }];
  chartLabelsPie: string[] = ["etudiant", "admin"];
  chartOptions: ChartOptions = {};

  chartDataLieu: ChartDataset[] = [{ label: 'Événements par Lieu', data: [] }];
  chartLabelsLieu: string[] = ["Sfax", "Tunis"];
  chartOptionsLieu: ChartOptions = {};

  chartDataLine: ChartDataset[] = [{ label: 'Événements par Membre', data: [] }];
  chartLabelsLine: string[] = [];
  chartOptionsLine: ChartOptions = {};

  chartDataBar: ChartDataset[] = [{ label: 'Événements par Lieu', data: [] }];
  chartLabelsBar: string[] = [];
  chartOptionsBar: ChartOptions = {};

  constructor(
    private ms: MemberService,
    private ps: PubService,
    private es: EventService,
    private ts: ToolService
  ) {
    this.loadMembers();
    this.loadEvents();
    this.loadPubs();
    this.loadTools();
  }

  loadMembers() {
    this.ms.getAllMembers().subscribe((data: any[]) => {
      this.NB_Members = data.length;

      data.forEach(member => {
        if (member.type === "etudiant") this.NB_Etudiant++;
        else this.NB_Admin++;

        this.tab_names.push(member.name);
        this.tab_events.push(member.tabEvents?.length || 0);
      });

      this.chartDataPie = [{ label: 'Type Membres', data: [this.NB_Etudiant, this.NB_Admin] }];
      this.chartLabelsLine = this.tab_names;
      this.chartDataLine = [{ label: 'Événements par Membre', data: this.tab_events }];
    });
  }

  loadEvents() {
    this.es.getAllEvents().subscribe((data: any[]) => {
      this.NB_Events = data.length;

      data.forEach(event => {
        if (event.lieu === "Sfax") this.NB_Sfax++;
        else if (event.lieu === "Tunis") this.NB_Tunis++;
      });

      this.chartDataLieu = [{ label: 'Événements par Lieu', data: [this.NB_Sfax, this.NB_Tunis] }];
    });

    this.es.getAllEvents().subscribe((response: any[]) => {
      this.tab_eventss = [...new Set(response.map(event => event.lieu))];
      this.chartLabelsBar = this.tab_eventss;

      const eventCounts = this.tab_eventss.map(lieu =>
        response.filter(event => event.lieu === lieu).length
      );

      this.chartDataBar = [{ label: 'Événements par Lieu', data: eventCounts }];
    });
  }

  loadPubs() {
    this.ps.getAllPubs().subscribe((data: any[]) => {
      this.NB_Articles = data.length;
    });
  }

  loadTools() {
    this.ts.getallTools().subscribe((data: any[]) => {
      this.NB_Tools = data.length;
    });
  }
}
