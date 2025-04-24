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
  NB_Members : number = 0;
  NB_Events : number = 0;
  NB_Articles : number = 0;
  NB_Tools : number = 0;
NB_Etudiant : number = 0;
NB_Admin : number = 0;
NB_Tunis : number = 0;
NB_Sfax : number = 0;
tab_names : string[] = [];
tab_events : number[] = [];

  chartDataPie: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: [ this.NB_Etudiant, this.NB_Admin]
    }
  ];
  chartLabelsPie: string[] = ["etudiant","admin"];
  chartOptions: ChartOptions = {};




  chartDataLieu: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: [ this.NB_Sfax, this.NB_Tunis]
    }
  ];
  chartLabelsLieu: string[] = ["Sfax","Tunis"];
  chartOptionsLieu: ChartOptions = {};



  chartDataLine: ChartDataset[] = [
    {
      // ⤵️ Add these
      label: '$ in millions',
      data: []
    }
  ];
  chartLabelsLine: string[] = [];
  chartOptionsLine: ChartOptions = {};


  chartDatabar: ChartDataset[] = [
    {
     label:'Nombre des etudiants',
      data: []
    }
  ];
  chartLabelsbar: string[] = ['Sfax', 'Tunis'];
  chartOptionsbar: ChartOptions = {};




  constructor(private ms: MemberService, private ps:PubService,private es:EventService,private ts:ToolService) {
  {
    this.ms.getAllMembers().subscribe((data: any) => {
      this.NB_Members = data.length;
         for(let i=0;i<this.NB_Members;i++)
         {
          if(data[i].type=="etudiant")
          {
            this.NB_Etudiant++;
           
          }
          else
          {
            this.NB_Admin++;
            
          }
         }
         console.log("nbadmin",this.NB_Admin);
         console.log("nbetudiant",this.NB_Etudiant);

         this.chartDataPie=[
          {
          data:[this.NB_Etudiant,this.NB_Admin]
    }]

for(let i=0;i<this.NB_Members;i++)
{
  //this.chartLabelsLine.push(data[i].name);
  this.tab_names.push(data[i].name);
  this.tab_events.push(data[i].tabEvents.length);
  
}
this.chartLabelsLine=this.tab_names;
this.chartDataLine=[
{
data:this.tab_events
}
]
console.log("noms",this.chartLabelsLine);


    });

    this.es.getAllEvents().subscribe((data: any) => {
      this.NB_Events = data.length;


      for(let i=0;i<this.NB_Events;i++)
        {
         if(data[i].lieu=="Sfax")
         {
           this.NB_Sfax++;
          
         }
         else
         {
           this.NB_Tunis++;
           
         }
        }
        // console.log("nbadmin",this.NB_Admin);
        // console.log("nbetudiant",this.NB_Etudiant);

        this.chartDataLieu=[
         {
         data:[this.NB_Sfax,this.NB_Tunis]
   }]

   this.chartDatabar=[
    {
      data:[this.NB_Sfax,this.NB_Tunis] 
    }
  ]
   
    });
    this.ps.getAllPubs().subscribe((data: any) => {
      this.NB_Articles = data.length;
    });

    this.ts.getallTools().subscribe((data: any) => {
      this.NB_Tools = data.length;
    });

  }

}
}