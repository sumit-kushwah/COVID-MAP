export function getVideoUrls(response: any): string[] {
  let urls : string[] = [];
  if (response["items"]) {
    response["items"].forEach((item: any) => {
      urls.push("http://www.youtube.com/embed/" + item["id"]["videoId"]);
    })
  }
  return urls;
}
