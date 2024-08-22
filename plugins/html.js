import { render } from 'ejs';

export function HtmlPlugin (options) {
    const data = options?.inject?.data;

    console.log(data)

    return {
        name: 'HTMLPlugin',
        transformIndexHtml: {
            order: 'pre',
            handler(html, ctx) {
                console.log(ctx)
                return render(html, data);
            }
        }
    }
}