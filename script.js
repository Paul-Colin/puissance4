ctx = document.getElementById("zonedessin").getContext('2d');
window.addEventListener("load",init);
largeur_grille = 700;
hauteur_grille = 600; 
x_cercle = 150;
y_cercle = 150;
rayon_cercle = 40;
cercle_par_largeur = 7;
cercle_par_hauteur = 6;
couleur = "red" ;
les_pions=[];
n=0;
joueur = 1;
mouvement = 100;
limite = hauteur_grille + 50;
anti_spam = true;
anti_depassement = false ;
compteur_ligne = 0;
pion_aligne1 = false;
pion_aligne2 = false;
pion_aligne3 = false;
var tableau = [[],[]] ;
var ligne = 0 
var colonne = 0 

function creationTab (){
/* création du tableau à double entrée  */
	for (i=0 ;i < cercle_par_largeur ;i=i+1){
		for(j=0;j < cercle_par_hauteur; j=j+1){ 
			tableau [[i],[j]] = false
		}
	}
}

function init(){
	document.addEventListener("keydown", deplacement);
	grille_de_jeu();	
	creation_pion();
	creationTab();
}


function grille_de_jeu (){
	x_cercle = 150
	y_cercle = 150
	ctx.beginPath("rectangle");
	ctx.strokeStyle="black";
	ctx.lineWidth="2";
	ctx.fillStyle="blue";
	ctx.rect(100,100,largeur_grille, hauteur_grille);
	ctx.fill();
	ctx.stroke();
	
	ctx.beginPath("cercle");
	ctx.lineWidth="2";
	ctx.globalCompositeOperation = 'destination-out';
	for(i=0 ;i < cercle_par_largeur;i=i+1){
		
		for(j=0 ;j<cercle_par_hauteur ;j=j+1){
			ctx.moveTo(x_cercle,y_cercle);
			ctx.arc(x_cercle, y_cercle, rayon_cercle, 0, 2 * Math.PI);
			y_cercle = y_cercle + 100;
		}
		x_cercle = x_cercle + 100;
		y_cercle = 150
	}
	ctx.fill();
	ctx.stroke();
	
}

function pion(x,y,rayon,v,couleur){
	this.x = x;
	this.y = y;
	this.rayon = rayon;
	this.v = v;
	this.couleur = couleur;
}
function creation_pion(){
	les_pions[n] = new pion(450,50,rayon_cercle,10,couleur)
	Construction_pion(les_pions[n]);
}


function Construction_pion(objet){
	ctx.beginPath("pion");
	ctx.globalCompositeOperation = 'destination-over';
	ctx.strokeStyle="black";
	ctx.lineWidth="2";
	ctx.fillStyle=objet.couleur;
	ctx.arc(objet.x, objet.y, objet.rayon, 0, 2 * Math.PI);
	ctx.fill();
	ctx.stroke();
}

function reconstruction(){
	ctx.clearRect(0,0,1100,1100); // effacer le canvas
	
	grille_de_jeu();
	Construction_pion(les_pions[n]);		
	for(i=0 ;i < n;i=i+1){ 
			Construction_pion(les_pions[i]);
		}
}

function animation(){
	if (les_pions[n].y <  limite){
		les_pions[n].y =les_pions[n].y + les_pions[n].v;
		reconstruction();
		window.requestAnimationFrame(animation);
	
	}
	else{
		detection();
		n=n+1;
		mouvement =100; 
		limite = hauteur_grille + 50;
		anti_spam = true;   
		if (joueur == 1){
			joueur = 2;
			couleur="yellow"
		}
		else if (joueur == 2){
			joueur = 1
			couleur="red"
			}
		creation_pion();
	}
}

function deplacement(event){
	codeTouche = event.keyCode; // keycode renvoie le code touche
    var touche = String.fromCharCode(codeTouche);
 
	if (codeTouche == 40){//aller vers le bas
		anti_bug();
		if (anti_spam == true && anti_depassement == false) { 
			empilement();
			animation();
			mouvement=0;
			anti_spam = false;
			
		}
	 }	
	 
	if (codeTouche == 39){
		if(les_pions[n].x < largeur_grille + 50 ){
			les_pions[n].x =les_pions[n].x + mouvement;
			reconstruction();
		}
		else{

			return
		}
	}
	
	if (codeTouche == 37){
		if(les_pions[n].x > 150 ){
			les_pions[n].x =les_pions[n].x - mouvement;
			reconstruction();
		}
		else{
			return
		}
	}
}

function empilement(){
	for(i=0 ;i < n;i=i+1){ 
		if (les_pions[n].x == les_pions[i].x ){
			limite= limite -100 ;
			
		}
		
	}
			
}


function anti_bug (){
	for (i=0 ;i < n+1;i=i+1){ 
		if (les_pions[i].x == les_pions[n].x && les_pions[n].y == les_pions[i].y - 100 && anti_spam == true){
			alert("impossible");
			anti_depassement = true;
		}
		else{
			anti_depassement = false;
		}
	}
}
function detection_horizontal(){
	for(i=0;i<n;i=i+1){
		for(j=0;j<n;j=j+1){
			for(k=0;k<n;k=k+1){
			if ((les_pions[n].x==les_pions[i].x-100 && les_pions[n].x==les_pions[j].x-200 && les_pions[n].x==les_pions[k].x-300 && 
			    les_pions[n].y == les_pions[i].y && les_pions[n].y == les_pions[j].y && les_pions[n].y == les_pions[k].y &&
				les_pions[n].couleur == les_pions[i].couleur && les_pions[n].couleur == les_pions[j].couleur && les_pions[n].couleur == les_pions[k].couleur)
				
				||
				(les_pions[n].x==les_pions[i].x+100 && les_pions[n].x==les_pions[j].x+200 && les_pions[n].x==les_pions[k].x+300 && 
			    les_pions[n].y == les_pions[i].y && les_pions[n].y == les_pions[j].y && les_pions[n].y == les_pions[k].y &&
				les_pions[n].couleur == les_pions[i].couleur && les_pions[n].couleur == les_pions[j].couleur && les_pions[n].couleur == les_pions[k].couleur)
				
				||
				((les_pions[n].x==les_pions[i].x+100 && les_pions[n].x==les_pions[j].x+200 && les_pions[n].x==les_pions[k].x-100 && 
			    les_pions[n].y == les_pions[i].y && les_pions[n].y == les_pions[j].y && les_pions[n].y == les_pions[k].y &&
				les_pions[n].couleur == les_pions[i].couleur && les_pions[n].couleur == les_pions[j].couleur && les_pions[n].couleur == les_pions[k].couleur))
				
				||
				(les_pions[n].x==les_pions[i].x+100 && les_pions[n].x==les_pions[j].x-100 && les_pions[n].x==les_pions[k].x-200 && 
			    les_pions[n].y == les_pions[i].y && les_pions[n].y == les_pions[j].y && les_pions[n].y == les_pions[k].y &&
				les_pions[n].couleur == les_pions[i].couleur && les_pions[n].couleur == les_pions[j].couleur && les_pions[n].couleur == les_pions[k].couleur)
				){
				alert("gagné");
				}
			}
		}
	}
} 

/* function detection_vertical(){
	for(i=0;i<n;i=i+1){
		for(j=0;j<n;j=j+1){
			for(k=0;k<n;k=k+1){
				if(les_pions[n].x =les_pions[i].x &&  les_pions[n].y==les_pions[i].y-100  && les_pions[n].y==les_pions[j].y-200 && les_pions[n].y==les_pions[k].y+300  && 
				   les_pions[n].couleur == les_pions[i].couleur && les_pions[n].couleur == les_pions[j].couleur && les_pions[n].couleur == les_pions[k].couleur    ){
				   alert("Gagné");
				  }
			}
		}
	}
} */

function detection(){
	detection_horizontal();
	//detection_vertical();
	}
		

		
	


