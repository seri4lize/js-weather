const weather = require("weather-js");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Hava durumunu öğrenmek istediğin şehir:\n ", (country) => {
  if (!country) {
    console.log("Lütfen bir şehir adı girin");
    readline.close();
    return;
  }
  weather.find(
    { search: `${country}`, degreeType: `C` },
    function (error, result) {
      if (error) {
        return console.log(error);
      } else if (result.length === 0) {
        return console.log("Şehir Bulunamadı");
      } else {
        const current = result[0].current;
        const temperature = current.temperature;
        const humidity = current.humidity;
        const day = turkishDay(current.day);
        const feelslike = current.feelslike;
        function turkishDay(day) {
          switch (day) {
            case "Monday":
              return "Pazartesi";
            case "Tuesday":
              return "Salı";
            case "Wednesday":
              return "Çarşamba";
            case "Thursday":
              return "Perşembe";
            case "Friday":
              return "Cuma";
            case "Saturday":
              return "Cumartesi";
            case "Sunday":
              return "Pazar";
            default:
              return day;
          }
        }
        console.log(
          `${
            country.charAt(0).toUpperCase() + country.slice(1)
          } için İstatistikler\n`
        );
        console.log(
          `Derece: ${temperature}°C\nHissedilen: ${feelslike}°C\nNem: %${humidity}\nGün: ${day}`
        );
      }
      readline.close();
    }
  );
});
