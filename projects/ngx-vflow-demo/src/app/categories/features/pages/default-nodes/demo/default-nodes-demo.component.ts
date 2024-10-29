import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CustomBackground,
  Node,
  VflowModule,
} from 'projects/ngx-vflow-lib/src/public-api';

@Component({
  template: `
    <vflow view="auto" [nodes]="nodes" 
    [background]="customBackground"
    [maxZoom]="100"
    [minZoom]="-100"
    />
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [VflowModule],
})
export class DefaultNodesDemoComponent {
  public customBackground: CustomBackground = {
    type: 'custom',
    svg: `
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="red" />
      <circle cx="50" cy="50" r="40" fill="green" />
    </svg>
    `,
    color: 'red',
  };

  public nodes: Node[] = [
    {
      id: '1',
      point: { x: 100, y: 100 },
      type: 'default',
      text: `1`,
    },
    {
      id: '2',
      point: { x: 200, y: 200 },
      type: 'default',
      // it's possible to pass html in this field
      text: `<strong>2</strong>`,
    },
  ];
}
