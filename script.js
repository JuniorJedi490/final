function makeNodeLinkGraph() {
	
	const types = ["Grass","Fire","Water","Bug","Normal","Poison","Electric","Ground","Fairy","Fighting","Psychic","Rock","Ghost","Ice","Dragon","Flying"];
	const scheme = ["#52AD18","#C72100","#0C66C1","#87950D","#B2B2B2","#6D2470","#E79302","#B18F34","#E28FE2","#682714","#DF366C","#A38A3F","#454592","#71D5F5","#6751C9","#5D73D4"];
	const height = 500;
  const width = 750;
	
  function color(type) {
		for( i = 0 ; i < types.length ; i++ ) { if(type.localeCompare(types[i])==0) { return scheme[i]; } }
		return "#000000"; }
        
  const data = d3.json("data.json")
    .then((response) => {
      console.log(response);
      var species = [];
      var links2 = [];
      var grass = [];
      var fire = [];
      var water = [];
      var bug = [];
      var normal = [];
      var poison = [];
      var electric = [];
      var ground = [];
      var fairy = [];
      var fighting = [];
      var psychic = [];
      var rock = [];
      var ghost = [];
      var ice = [];
      var dragon = [];
      var flying = [];
      for(let i = 0; i < response.species.length; i++){
        species.push(
          {species: response.species[i],
             index: response.index[i],
             typeA: response.typeA[i],
             typeB: response.typeB[i],
             baseHP: response.baseHP[i],
             baseAttack: response.baseAttack[i],
             baseDefense: response.baseDefense[i],
             baseSpeed: response.baseSpeed[i],
             baseSpecial: response.baseSpecial[i],
             total: response.total[i],
             sprite: response.sprite[i]
            }
        )
      }
      console.log("species: " + JSON.stringify(species));
      //add species to their type arrays
      for(let i = 0; i < species.length; i ++){
        if((species[i].typeA === "Grass") || (species[i].typeB === "Grass")){
          grass.push(species[i].species);
        }
        if((species[i].typeA === "Fire") || (species[i].typeB === "Fire")){
          fire.push(species[i].species);
        }
        if((species[i].typeA === "Water") || (species[i].typeB === "water")){
          water.push(species[i].species);
        }
        if((species[i].typeA === "Bug") || (species[i].typeB === "Bug")){
          bug.push(species[i].species);
        }
        if((species[i].typeA === "Normal") || (species[i].typeB === "Normal")){
          normal.push(species[i].species);
        }
        if((species[i].typeA === "Poison") || (species[i].typeB === "Poison")){
          poison.push(species[i].species);
        }
        if((species[i].typeA === "Electric") || (species[i].typeB === "Electric")){
          electric.push(species[i].species);
        }
        if((species[i].typeA === "Ground") || (species[i].typeB === "Ground")){
          ground.push(species[i].species);
        }
        if((species[i].typeA === "Fairy") || (species[i].typeB === "Fairy")){
          fairy.push(species[i].species);
        }
        if((species[i].typeA === "Fighting") || (species[i].typeB === "Fighting")){
          fighting.push(species[i].species);
        }
        if((species[i].typeA === "Psychic") || (species[i].typeB === "Psychic")){
          psychic.push(species[i].species);
        }
        if((species[i].typeA === "Rock") || (species[i].typeB === "Rock")){
          rock.push(species[i].species);
        }
        if((species[i].typeA === "Ghost") || (species[i].typeB === "Ghost")){
          ghost.push(species[i].species);
        }
        if((species[i].typeA === "Ice") || (species[i].typeB === "Ice")){
          ice.push(species[i].species);
        }
        if((species[i].typeA === "Dragon") || (species[i].typeB === "Dragon")){
          dragon.push(species[i].species);
        }
        if((species[i].typeA === "Flying") || (species[i].typeB === "Flying")){
          flying.push(species[i].species);
        }
      }
      console.log("grass: " + JSON.stringify(grass));
      links2 = addLinks(grass, "grass", links2);
      links2 = addLinks(fire, "fire", links2);
      links2 = addLinks(water, "water", links2);
      links2 = addLinks(bug, "bug", links2);
      links2 = addLinks(normal, "normal", links2);
      links2 = addLinks(poison, "poison", links2);
      links2 = addLinks(electric, "electric", links2);
      links2 = addLinks(ground, "ground", links2);
      links2 = addLinks(fairy, "fairy", links2);
      links2 = addLinks(fighting, "fighting", links2);
      links2 = addLinks(psychic, "psychic", links2);
      links2 = addLinks(rock, "rock", links2);
      links2 = addLinks(ice, "ice", links2);
      links2 = addLinks(ghost, "ghost", links2);
      links2 = addLinks(dragon, "dragon", links2);
      links2 = addLinks(flying, "flying", links2);

      console.log("links2: " + JSON.stringify(links2));

      const nodes = species.map(d => Object.create(d));
      const index = new Map(nodes.map(d => [d.species, d]));
      const links = links2.map(d => Object.assign(Object.create(d), {
        source: index.get(d.source),
        target: index.get(d.target)
      }));

      console.log("index: \n");
      console.log(index);
      console.log("nodes: \n");
      console.log(nodes);

      // const svg = d3.select(DOM.svg(width, height));
      const svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
		
	const legend = svg.append("g")
          .attr("stroke", "#fff")
          .attr("stroke-width", 1);
	
	legend.append("rect")
		.attr("stroke","black")
		.attr("fill", "none")
		.attr("x",(width-100))
		.attr("y",0)
		.attr("width",100)
		.attr("height",height);
		
	legend
		.selectAll("circle")
		.data(types)
		.enter().append("circle")
		  .attr("r", 5)
		  .attr("fill", d => color(d))
		  .attr("cx", (width-90))
		  .attr("cy", (d,i) => ((i+1) * height/18));
		  
	legend
		.selectAll("text")
		.data(types)
		.enter().append("text")
		  .attr("x", (width-75))
		  .attr("y", (d,i) => ((i+1) * height/18 + 5))
		  .attr("class", "legend")
		  .text(d => d);
	

      const layout = cola.d3adaptor(d3)
          .size([width, height])
          .nodes(nodes)
          .links(links)
          .jaccardLinkLengths(40, 0.7)
          .start(30);
      
      const link = svg.append("g")
          .attr("stroke", "#999")
          .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(links)
        .enter().append("line")
          .attr("stroke-width", d => Math.sqrt(d.value));

      const node = svg.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
          .attr("r", 5)
          .attr("fill", d => color(d.typeA))
      	  .attr("stroke", function(d){if(d.typeB){return color(d.typeB);} else{return color(d.typeA);}})
          .attr("stroke-width", 2.5)
		.on("mouseover", mouseover)
		.on("mousemove", mousemove)
		.on("mouseleave", mouseleave)
          .call(layout.drag);

	  var tooltip = d3.select("#graph").append("div")
		.attr("class", "tooltip")
		.style("background-color", "white")
		.style("border-width", 1)
		.style("border-radius", 10)
		.style("padding", 5)
		.style("opacity", 0)
		.html("hi UwU");
	
	  // Credit: https://www.d3-graph-gallery.com/graph/interactivity_tooltip.html#template
	  function mouseover() {
		tooltip.style("opacity", 1);
		d3.select(this).style("opacity", 0.75);
	  }
	  
	  function mouseleave() {
		tooltip.style("opacity", 0);
		d3.select(this).style("opacity", 1);
	  }
	  
	  function mousemove(d) {
		  console.log(d);
		tooltip
        .style("left", (event.pageX) + "px")
        .style("top", (event.pageY) + "px")
		.html(d => ("<img src=" + Object.getPrototypeOf(d).sprite + " /><br>" /*+ d.species + "<br>"
		  + d.typeA + "/" + d.typeB + "<br>Stats:<br>  HP: " + d.baseHP + "<br>  Attack: " + d.baseAttack
		  + "<br>  Defense: " + d.baseDefense + "<br>  Speed: " + d.baseSpeed
		  + "<br>  Special: " + d.baseSpecial + "<br>  Total: " + *//*d.total*/));
      }		
		
      layout.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
      });

      invalidation.then(() => layout.stop());

      return svg.node();
    });
    
  
  // const nodes = data.nodes.map(d => Object.create(d));
  // const index = new Map(nodes.map(d => [d.id, d]));
  // const links = data.links.map(d => Object.assign(Object.create(d), {
  //   source: index.get(d.source),
  //   target: index.get(d.target)
  // }));

  // const nodes = species.map(d => Object.create(d));
  // const index = new Map(nodes.map(d => [d.id, d]));
  // const links2 = links.map(d => Object.assign(Object.create(d), {
  //   source: index.get(d.source),
  //   target: index.get(d.target)
  // }));

  // const svg = d3.select(DOM.svg(width, height));

  // const layout = cola.d3adaptor(d3)
  //     .size([width, height])
  //     .nodes(nodes)
  //     .links(links2)
  //     .jaccardLinkLengths(40, 0.7)
  //     .start(30);
  
  // const link = svg.append("g")
  //     .attr("stroke", "#999")
  //     .attr("stroke-opacity", 0.6)
  //   .selectAll("line")
  //   .data(links2)
  //   .enter().append("line")
  //     .attr("stroke-width", d => Math.sqrt(d.value));

  // const node = svg.append("g")
  //     .attr("stroke", "#fff")
  //     .attr("stroke-width", 1.5)
  //   .selectAll("circle")
  //   .data(nodes)
  //   .enter().append("circle")
  //     .attr("r", 5)
  //     .attr("fill", d => color(d.group))
  //     .call(layout.drag);

  // node.append("title")
  //     .text(d => d.id);

  // layout.on("tick", () => {
  //   link
  //       .attr("x1", d => d.source.x)
  //       .attr("y1", d => d.source.y)
  //       .attr("x2", d => d.target.x)
  //       .attr("y2", d => d.target.y);

  //   node
  //       .attr("cx", d => d.x)
  //       .attr("cy", d => d.y);
  // });

  // invalidation.then(() => layout.stop());

  // return svg.node();
}

function addLinks(d, type, links2) {
  // var newLinks = [];
  for(let i = 0; i < d.length-1; i++){
    for(let j = i+1; j<d.length; j++){
      links2.push({
        source: d[i], target: d[j], value: type
      })
    }
  }
  return links2;
}
