


class Weather {
    constructor() {
        let arr
        this.data=[]
        this.name='';
        this.country='';
        this.weather=[]
        this.init()

    }

    init() {
        const weatherApp = document.querySelector('.weather_app');
        weatherApp.innerHTML = `<div class="up">
                                    <div class="header">
                                    <h2>Погода в вашем городе</h2>
                                    </div>
                                    <div class="inputs">
                                    <input class="input"type="text" value="Brest">
                                    </div>
                                    <button class="btn">Найти</button>
                                </div>
                                <div class="down">
                                    <ul class='weather_items'></ul>
                                </div>  
                                `
        this.siti()
        this.clickBtn()
    }

    sitiLocation(siti) {/*определяется долгота и широта города */
        let sitiLoc = fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${siti}&limit=5&appid=15be81ae52b1e89db50ef966fe4f2113`);


        // let sitiJson = sitiLoc.then(response => response.json()).then(json => json)
        // console.log(sitiJson)
        
    /*не понимаю как правильно вывести этот массив с обьектами */
        let sitiJson = sitiLoc.then(response => response.json()).then(json => {console.log(json)
            for(let i = 0; i < json.length; i++){
                this.data.push(json[i])
                console.log(this.data)
            }
        })

        this.data.forEach(({name, lat, lon, country})=>{
            
            this.country=country;
            this.name=name;
            
            this.sitiWeather(lat, lon)
        })
        
    }

    sitiWeather(lat, lon) {
            let weather = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=15be81ae52b1e89db50ef966fe4f2113`)
            let weatherSiti = weather.then(response => response.json()).then(json=>this.weather.push(json))
            this.addWeather(this.weather)
            console.log(this.weather)
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
            // this.siti().value=''
        })
    }

    addWeather(arr) {
        const ul = document.querySelector('.weather_items');
        let li = '';
        console.log(arr)
        /*до сюда доходит только со второго клика */
        /*при добавлении не видит main:{temp}, visibility, wind:{deg, speed  */
        // arr.forEach(({main:{temp}, visibility, wind:{deg, speed}})=>{

        // })

        // li += `<li class="content">
        //                     <p>Город: ${this.name}</p>
        //                     <p>Страна: ${this.country}</p>
        //                     <p>Скорость ветра: ${speed}</p>
        //                     <p>Направление ветера: ${deg}</p>
        //                     <p>Температура: ${temp}</p>
        //                     <p>Видимость: ${visibility}</p>
                            
        //                 </li>`
        //                 ul.innerHTML = li;
    }

}

window.addEventListener('load', ()=> {
    const weather = new Weather()
})


