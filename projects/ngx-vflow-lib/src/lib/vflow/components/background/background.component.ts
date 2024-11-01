import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ViewportService } from '../../services/viewport.service';
import { RootSvgReferenceDirective } from '../../directives/reference.directive';
import { id } from '../../utils/id';
import { FlowSettingsService } from '../../services/flow-settings.service';

const defaultBg = '#fff'
const defaultGap = 20
const defaultDotSize = 2
const defaultDotColor = 'rgb(177, 177, 183)'

@Component({
  selector: 'g[background]',
  templateUrl: './background.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BackgroundComponent {
  private viewportService = inject(ViewportService)
  private rootSvg = inject(RootSvgReferenceDirective).element
  private settingsService = inject(FlowSettingsService);

  protected backgroundSignal = this.settingsService.background

  protected scaledGap = computed(() => {
    const background = this.backgroundSignal()

    if (background.type === 'dots') {
      const zoom = this.viewportService.readableViewport().zoom

      return zoom * (background.gap ?? defaultGap)
    }

    return 0
  })

  protected x = computed(() => this.viewportService.readableViewport().x % this.scaledGap())

  protected y = computed(() => this.viewportService.readableViewport().y % this.scaledGap())

  protected patternColor = computed(() => this.backgroundSignal().color ?? defaultDotColor)

  protected patternSize = computed(() => {
    const background = this.backgroundSignal()

    if (background.type === 'dots') {
      return (this.viewportService.readableViewport().zoom * (background.size ?? defaultDotSize)) / 2
    }

    return 0
  })

  // Without ID there will be pattern collision for several flows on the page
  // Later pattern ID may be exposed to API
  protected patternId = id();
  protected patternUrl = `url(#${this.patternId})`

  constructor() {
    effect(() => {
      const background = this.backgroundSignal()

      if (background.type === 'dots') {
        this.rootSvg.style.backgroundColor = background.backgroundColor ?? defaultBg
      }

      if (background.type === 'solid') {
        this.rootSvg.style.backgroundColor = background.color
      }
    })
  }
}
