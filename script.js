


class Weather {
    constructor() {
        this.data=[]
        // this.name='';
        // this.country='';
        // this.lat='';
        // this.lon='';
        this.weather=[]
        this.init()

    }

    init() {
        const weatherApp = document.querySelector('.site');
        weatherApp.innerHTML = `<div class="weather_app">    
                                    <div class="up">
                                        <div class="header">
                                            <h2>Погода в вашем городе</h2>
                                        </div>
                                        <div class="inputs">
                                            <input class="input"type="text" value="Brest">
                                        </div>
                                        <div class="button">
                                            <button class="btn">Найти</button>
                                        </div>
                                    </div>
                                    <div class="down">
                                        <ul class='weather_items'></ul>
                                    </div>
                                </div>  
                                `
        this.siti()
        this.clickBtn()
    }

    sitiLocation(siti) {/*определяется долгота и широта города */
        let sitiLoc = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${siti}&limit=5&appid=15be81ae52b1e89db50ef966fe4f2113`);


        // let sitiJson = sitiLoc.then(response => response.json()).then(json => json)
        // console.log(sitiJson)
        
                                   //вроде разобрался                                 /*не понимаю как правильно вывести этот массив с обьектами *///
        let sitiJson = sitiLoc.then(response => response.json()).then(json => {console.log(json)

            for(let i = 0; i < json.length; i++){
                this.data.push(json[i])
                // console.log(this.data)
            }
            //console.log(this.data)
        

        this.data.forEach(({lat, lon})=>{
            
            // this.country=country;
            // this.name=name;
            // this.lat=lat;
            // this.lon=lon;

                                                                            /*из за того что this.sitiWeather(lat, lon) нв ходиться в forEach добавляет все несколько раз,
                                                                            по другом как то вообще не работает */

            this.sitiWeather(lat, lon)
        })
    })// this.sitiWeather(this.lat, this.lon)
    }

    sitiWeather(lat, lon) {
            let weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=15be81ae52b1e89db50ef966fe4f2113`)
            let weatherSiti = weather.then(response => response.json())
                                    .then(json => {console.log(json)
                                        this.weather.push(json)
                                        this.addWeather(this.weather)
                                    })
            
            
        }

    siti() {
        let input = document.querySelector('.input')
        return input
    }

    clickBtn() {
        
        const btn = document.querySelector('.btn')
        btn.addEventListener('click', () =>{
            let inputValue = this.siti().value
            

            
            this.sitiLocation(inputValue)
            this.data=[]
            this.siti().value=''
        })
    }

    addWeather(arr) {
        const ul = document.querySelector('.weather_items');
        let li = '';
        console.log(arr)


        
        /*при добавлении не видит main:{temp}, visibility, wind:{deg, speed  
        и создается массив только с первым городом, а не с несколькими*/


        arr.forEach(({main:{temp}, name, sys:{country}, visibility, wind:{deg, speed}})=>{
            li += `<li class="content">
                                        <p>Город: ${name}</p>
                                        <p>Страна: ${country}</p>
                                        <p>Скорость ветра: ${speed}</p>
                                        <p>Направление ветера: ${deg}</p>
                                        <p>Температура: ${Math.floor(temp-273)}</p>
                                        <p>Видимость: ${visibility}</p>
                                        
                                    </li>`
                                    ul.innerHTML = li;
        }) 

        
    }

}

window.addEventListener('load', ()=> {
    const weather = new Weather()
})


