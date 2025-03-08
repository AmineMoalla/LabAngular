import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberFormComponent } from './member-form/member-form.component';
import { MemberComponent } from './member/member.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EventComponent } from './event/event.component';
import { ArticleComponent } from './article/article.component';
import { ToolComponent } from './tool/tool.component';

const routes: Routes = [

  {path:'create',
    pathMatch:'full',
  component:MemberFormComponent
  
  },
  
  {path:'edit/:id',
  pathMatch:'full',
  component:MemberFormComponent
  
  },

  {path:'',
    pathMatch:'full',
    component:MemberComponent
    
    },


    {path:'dashboard',
      pathMatch:'full',
      component:DashboardComponent
      
      },



      {path:'events',
        pathMatch:'full',
        component:EventComponent
        
        },



        {path:'articles',
          pathMatch:'full',
          component:ArticleComponent
          
          },



          {path:'tools',
            pathMatch:'full',
            component:ToolComponent
            
            },

            {path:'member',
              pathMatch:'full',
              component:MemberComponent
              
              },


    {path:'**',
      pathMatch:'full',
      component:MemberComponent
      
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
