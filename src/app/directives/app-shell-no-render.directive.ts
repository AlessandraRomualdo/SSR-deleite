import { isPlatformServer } from "@angular/common";
import { Directive, Inject, OnInit, PLATFORM_ID, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[AppShellNoRenderDirective]',
  standalone: true
})
export class AppShellNoRenderDirective implements OnInit {
  // PLATFORM_ID é um token de injeção que representa a plataforma onde a aplicação está sendo executada (navegador ou servidor).
  // TemplateRef representa o template associado à diretiva.
  // ViewContainerRef é um contêiner onde as views podem ser inseridas ou removidas dinamicamente.
  constructor(
    @Inject(PLATFORM_ID) private plataformId: Object,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}


  ngOnInit(): void {
    // isPlatformServer verifica se a aplicação está sendo executada no servidor.
    // Se estiver no servidor, a view é limpa (não renderiza nada).
    // Se estiver no navegador, a view é criada a partir do template associado.
    // isPLatformBrowser também poderia ser usado para o mesmo propósito.
    if (isPlatformServer(this.plataformId)) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}