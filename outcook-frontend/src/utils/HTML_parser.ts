export default function HTML_parser(html_string : string){

    const parser = new DOMParser();
    const html_doc = parser.parseFromString(html_string , "text/html");
    const paragraphs = html_doc.querySelectorAll('p');

    const array_of_paragraphs = Array.from(paragraphs)?.map((paragraph : HTMLParagraphElement) => {
            return paragraph.innerText
    })

    return array_of_paragraphs;
}