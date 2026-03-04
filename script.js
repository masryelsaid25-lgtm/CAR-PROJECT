// =============================
// BMW 2025 - 50 Cars Dynamic
// =============================

// صور حسب الفئة
const images = {
sedan: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80",
suv: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=80",
electric: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=1000&q=80",
m: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1000&q=80"
};

// أسماء موديلات
const models = [
"BMW 116i","BMW 118i","BMW 120i","BMW 128ti",
"BMW 218i","BMW 220i","BMW 228i",
"BMW 318i","BMW 320i","BMW 330i","BMW 340i",
"BMW 420i","BMW 430i","BMW 440i",
"BMW 520i","BMW 530i","BMW 540i",
"BMW 730i","BMW 740i",
"BMW X1","BMW X2","BMW X3","BMW X4","BMW X5","BMW X6","BMW X7",
"BMW i4","BMW i5","BMW i7","BMW iX1","BMW iX3","BMW iX",
"BMW M2","BMW M3","BMW M4","BMW M5","BMW M8",
"BMW X3 M","BMW X5 M","BMW X6 M",
"BMW Z4","BMW XM",
"BMW Alpina B3","BMW Alpina B5",
"BMW 840i","BMW 850i",
"BMW 760i",
"BMW M760e"
];

// تحديد النوع تلقائي
function getType(name){
if(name.includes("X") && !name.includes("XM")) return "suv";
if(name.includes("iX") || name.includes("i4") || name.includes("i5") || name.includes("i7")) return "electric";
if(name.includes("M")) return "m";
return "sedan";
}

// توليد 50 سيارة ديناميك
const cars = models.map((model,index)=>({
name: model + " 2025",
type: getType(model),
price: 35000 + (index * 2500),
image: images[getType(model)],
details: "موديل 2025 - محرك متطور - شاشة رقمية - أنظمة أمان كاملة - فتحة سقف بانوراما"
}));

// عناصر الصفحة
const container = document.getElementById("carsContainer");
const search = document.getElementById("search");
const filterType = document.getElementById("filterType");
const sortPrice = document.getElementById("sortPrice");
const modal = document.getElementById("carModal");
const modalDetails = document.getElementById("modalDetails");
const closeModal = document.getElementById("closeModal");

// عرض السيارات
function displayCars(list){
container.innerHTML="";
if(list.length===0){
container.innerHTML="<h2 style='text-align:center;'>لا يوجد نتائج</h2>";
return;
}

list.forEach(car=>{
const card=document.createElement("div");
card.classList.add("card");

card.innerHTML=`
<img src="${car.image}">
<div class="card-content">
<h3>${car.name}</h3>
<p class="price">$${car.price.toLocaleString()}</p>
</div>
`;

card.addEventListener("click",()=>openModal(car));
container.appendChild(card);
});
}

// فلترة + بحث + ترتيب
function filterCars(){
let filtered=[...cars];

if(filterType.value!=="all"){
filtered=filtered.filter(c=>c.type===filterType.value);
}

if(search.value){
filtered=filtered.filter(c=>
c.name.toLowerCase().includes(search.value.toLowerCase())
);
}

if(sortPrice.value==="low"){
filtered.sort((a,b)=>a.price-b.price);
}
if(sortPrice.value==="high"){
filtered.sort((a,b)=>b.price-a.price);
}

displayCars(filtered);
}

// المودال
function openModal(car){
modal.style.display="flex";
modalDetails.innerHTML=`
<h2>${car.name}</h2>
<img src="${car.image}" style="width:100%;margin:15px 0;border-radius:15px;">
<p>${car.details}</p>
<p class="price">$${car.price.toLocaleString()}</p>
`;
}

closeModal.onclick=()=>modal.style.display="none";
window.onclick=(e)=>{ if(e.target===modal) modal.style.display="none"; };

search.addEventListener("input",filterCars);
filterType.addEventListener("change",filterCars);
sortPrice.addEventListener("change",filterCars);

displayCars(cars);