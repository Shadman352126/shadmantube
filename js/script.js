// All categories function
const handleCategory = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const data = await res.json();
    const categoriesIteams = data.data;

    // Tab container loop
    const tabContainer = document.getElementById('tab-container');
    categoriesIteams.forEach((category) =>{
        const div = document.createElement('div');
        div.classList = `bg-neutral-300 md:p-1 lg:p-1 rounded-md`;
        div.innerHTML = `
        <a onclick="handleLoadCard('${category.category_id}')" class="tab text-sm md:text-lg lg:text-lg font-medium">${category.category}</a>
        `;
        tabContainer.appendChild(div);
    })
}

// specific category findout by id function
const handleLoadCard = async (categoryId) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const data = await res.json();

    const errorData = document.getElementById('error-data');
    if(data.data.length === 0){
        errorData.classList.remove('hidden');
    }
    else{
        errorData.classList.add('hidden');
    }
    const allData = data.data;

    function secToHouAndMi(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;
        const minutes = Math.floor(remainingSeconds / 60);
        return { hours, minutes };
    };

    // Card container loop
    const cardContainer = document.getElementById('card-container');
    viewContainer = cardContainer;
    cardContainer.innerHTML = "";
    allData.forEach((card) =>{
        console.log(card);
        const timeS = card?.others?.posted_date;
        const time = secToHouAndMi(timeS);
        const div = document.createElement('div');
        div.innerHTML = `
        <figure class="w-full"><img class="w-full h-60 rounded-lg relative z-0"  src=${card?.thumbnail} />
        <p id="time" class="absolute z-10 ml-64 mt-44 text-white bg-black rounded-lg py-[5px] px-[5px] lg:py-1 lg:px-3">${time.hours} hrs ${time.minutes} min ago</p>
        </figure>
        <div class="card-body">
        <div class="flex gap-4">
        <img class="rounded-full w-10 h-10" src=${card?.authors[0]?.profile_picture} /> 
        <div>
        <h2 class="card-title">${card?.title}</h2>
        <div class="flex">
        <p>${card?.authors[0]?.profile_name}</p>
        <p>
        ${card?.authors[0]?.verified === true ? '<img src="images/verify.svg">'
         : (card?.authors[0]?.verified === false ? '' : '')}
        </p>
        </div>
        <p>${card?.others?.views}</p>
        </div>
        </div>
        </div>
        `;
        cardContainer.appendChild(div);
    });
};

function secondToHour(seconds) {
    const hours = Math.floor(seconds / 3600);
    const remindingSeconds = seconds % 3600;
    const minutes = Math.floor(remindingSeconds / 60);
    return { hours, minutes };
}

handleCategory();
handleLoadCard('1000');

