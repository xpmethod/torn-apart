

export default function(d){

  return `<p><h4><b>Subsidiary Contractor:</b>
  <br><br>${d.name}
  <br><br><b>Parent Contractor:</b> <br>${d.awards[0].parent_name}
  <br><br><b>ICE Awarding Office:</b> <br>${d.awards[0].awarding_office_name}
  <br><br><b>Total value of awards:</b>
  <br>$${d.total_value}</h4>`;
}
