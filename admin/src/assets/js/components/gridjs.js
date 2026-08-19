


function initGridJS() {
  const basicGridEl = document.getElementById("basic-grid");
  if (basicGridEl) {
    new gridjs.Grid({
      columns: ["Name", "Email", "Phone Number"],
      data: [
        ["John", "john@example.com", "(353) 01 222 3333"],
        ["Mark", "mark@gmail.com", "(01) 22 888 4444"],
        ["Eoin", "eoin@gmail.com", "0097 22 654 00033"],
        ["Sarah", "sarahcdd@gmail.com", "+322 876 1233"],
        ["Afshin", "afshin@mail.com", "(353) 22 87 8356"]
      ]
    }).render(basicGridEl);
  }

  const advancedGridEl = document.getElementById("advanced-grid");
  if (advancedGridEl) {
    new gridjs.Grid({
      columns: ["Name", "Position", "Office", "Age", "Start date", "Salary"],
      search: true,
      sort: true,
      pagination: {
        enabled: true,
        limit: 5,
      },
      data: [
        ["Tiger Nixon", "System Architect", "Edinburgh", "61", "2011/04/25", "$320,800"],
        ["Garrett Winters", "Accountant", "Tokyo", "63", "2011/07/25", "$170,750"],
        ["Ashton Cox", "Junior Technical Author", "San Francisco", "66", "2009/01/12", "$86,000"],
        ["Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "22", "2012/03/29", "$433,060"],
        ["Airi Satou", "Accountant", "Tokyo", "33", "2008/11/28", "$162,700"],
        ["Brielle Williamson", "Integration Specialist", "New York", "61", "2012/12/02", "$372,000"],
        ["Herrod Chandler", "Sales Assistant", "San Francisco", "59", "2012/08/06", "$137,500"],
        ["Rhona Davidson", "Integration Specialist", "Tokyo", "55", "2010/10/14", "$327,900"],
        ["Colleen Hurst", "Javascript Developer", "San Francisco", "39", "2009/09/15", "$205,500"],
        ["Sonya Frost", "Software Engineer", "Edinburgh", "23", "2008/12/13", "$103,600"],
        ["Jena Gaines", "Office Manager", "London", "30", "2008/12/19", "$90,560"],
        ["Quinn Flynn", "Support Lead", "Edinburgh", "22", "2013/03/03", "$342,000"],
      ]
    }).render(advancedGridEl);
  }
}
