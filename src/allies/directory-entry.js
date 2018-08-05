export default function(ally){
  const externalLinkHTML = "<span>&nbsp;<i style='vertical-align: baseline; font-size: 60%;' class='fa fa-small fa-external-link-alt'></i></span>";
  let name = ally.name;
  let lines = [];
  if(ally.website){
    name = `<a target="_blank" href="${ally.website}">${ally.name}${externalLinkHTML}</a>`;
  }
  if(ally.city){
    let address = ally.city;
    if(ally.state){
      address = address + ", " + ally.state;
    }
    lines.push(address);
  }
  if(ally.phone){
    lines.push(`<i class="fas fa-phone"></i> ${ally.phone}`);
  }
  if(ally.email){
    lines.push(`<i class="fa fa-envelope"></i> ${ally.email}`);
  }
  if(ally.twitter){
    lines.push(`<a target="_blank" href="${ally.twitter.replace("@", "http://twitter.com/")}">
      <i class="fab fa-twitter"></i> 
      @${ally.twitter.match(/\w*$/)[0]}${externalLinkHTML}</a>`);

  }
  return `<div class="mb-2 ally-entry"><h4>${name}</h4>
    ${lines.join("<br />")}</div>`;
}
