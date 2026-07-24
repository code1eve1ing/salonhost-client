import Script from "./Script";
interface TemplateRendererProps {
  html: string,
  css: string,
  js: string
}

export default function TemplateRenderer({
  html,
  css,
  js
}: TemplateRendererProps) {

  // TODO: only use for premium templates
  const premiumTemplateCss = `
  #template-wrapper{
    background: var(--bg);
    opacity: 1;
    transition: opacity .25s ease;
  }
  #template-wrapper.hide{
    opacity: 0;
    pointer-events: none;
  }
  `

  return <>
    <style dangerouslySetInnerHTML={{ __html: css + premiumTemplateCss }} />
    <div id="template-wrapper" className="absolute min-h-screen inset-0 z-9999"></div>
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
    <Script js={js} />
  </>
}