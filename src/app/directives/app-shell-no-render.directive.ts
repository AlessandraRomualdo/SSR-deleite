import { isPlatformServer } from "@angular/common";
import { Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[AppShellNoRenderDirective]',
  standalone: true
})
export class AppShellNoRenderDirective implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private plataformId: Object,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}


  ngOnInit(): void {
    if (isPlatformServer(this.plataformId)) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}