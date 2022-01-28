// You should not need to modify anything in this file to set up your own survey website

const container = d3.select(".grid");

const facets = !taxonomy || Object.keys(taxonomy);

// create checkboxes to filter techniques
if (taxonomy != null) {
	var filters = d3
		.select("#filters")
		.selectAll("div")
		.data(facets)
		.enter()
		.append("div")
		.attr("id", (d) => "select_" + d)
		.attr(
			"class",
			(d) =>
				"select_width" +
				((taxonomy[d].length == 2) | (taxonomy[d].length == 4) ? 2 : 3)
		);

	filters.append("h3").html((d) => formatText(d));

	var checkboxes = filters
		.selectAll("input")
		.data((d) => taxonomy[d])
		.enter()
		.append("div")
		.classed("checkbox-container", true);
	checkboxes
		.append("input")
		.attr("type", "checkbox")
		.attr("class", "input")
		.attr("id", function (d) {
			return (
				"check_" +
				d3.select(this.parentNode.parentNode).datum() +
				"_" +
				d
			);
		})
		.attr("value", (d) => d);
	checkboxes
		.append("label")
		.attr("for", function (d) {
			return (
				"check_" +
				d3.select(this.parentNode.parentNode).datum() +
				"_" +
				d
			);
		})
		.append("span")
		.text((d) => formatText(d));
}

if (tags) {
	// checkboxes for data types
	var checkData = d3
		.select("#filters_data")
		.selectAll("div")
		.data(tags)
		.enter()
		.append("div");
	checkData
		.append("input")
		.attr("type", "checkbox")
		.attr("class", "input")
		.attr("id", (d) => "check_" + d)
		.attr("value", (d) => d);
	checkData
		.append("label")
		.attr("for", (d) => "check_" + d)
		.append("span")
		.text((d) => sentenceCase(d));
}

d3.select("#showall").on("click", function () {
	d3.selectAll("input").property("checked", false);
	// dispatch event to reload techniques
	let event = new Event("change");
	eventHandler.dispatchEvent(event);
});

d3.csv(url, (d, i) => {
	d.id = i;
	return d;
})
	.then(function (data) {
		console.log(data);

		// display count
		d3.selectAll("#count, #total").text(data.length);

		// listen for changes in filters
		d3.selectAll(".input").on("change", function () {
			// get filter values
			if (taxonomy != null) {
				var filters = facets.map(function (facet) {
					var cats = [];
					taxonomy[facet].forEach(function (cat) {
						if (
							d3
								.select("#check_" + facet + "_" + cat)
								.property("checked")
						) {
							cats.push(cat);
						}
					});
					return [facet, cats];
				});
			} else {
				var filters = null;
			}
			if (tags != null) {
				var dataFilters = tags.filter(function (d) {
					return d3.select("#check_" + d).property("checked");
				});
			} else {
				var dataFilters = null;
			}
			// update
			refreshTechniques(filters, dataFilters);
		});

		function refreshTechniques(filters, dataFilters) {
			// filter
			var fData = data.filter((d) => filterData(d, filters, dataFilters));
			// update count in heading
			d3.select("#count").text(fData.length);
			// get IDs of techniques matching filter
			var ids = fData.map((d) => d.id);
			// hide all non-matching ones
			d3.selectAll(".grid-item").style("display", (d) =>
				ids.indexOf(d.id) != -1 ? null : "none"
			);
			// update layout
			msnry.layout();
		}

		// draw boxes for papers
		var div = container
			.selectAll("div")
			.data(data)
			.enter()
			.append("div")
			.classed("grid-item", true);

		// show image if defined
		div.filter((d) => d.image != "")
			.append("img")
			.attr("src", (d) => "img/" + d.image);

		// add div for text content (modifiable in config)
		div.append("div").call(cardContent);

		// add taxonomy tags
		var tax_tags = div.append("div").style("margin-top", "7px");

		// add tags on technique cards (if taxonomy is defined)
		if (taxonomy) {
			facets.forEach(function (facet) {
				tax_tags
					.append("div")
					.classed("tag", true)
					.classed(facet, true)
					.html((d) => d[facet]);
			});
		}
	})
	.then(function () {
		imagesLoaded(".grid", function () {
			var elem = document.querySelector(".grid");
			window.msnry = new Masonry(elem, {
				// options
				itemSelector: ".grid-item",
				columnWidth: 241,
				gutter: 15,
			});
		});
	})
	.catch(function (error) {
		throw error;
	});

function filterData(d, filters, dataFilters) {
	return (
		(filters == null ||
			filters.every(function (fil) {
				// facet: fil[0]
				// selected: fil[1]
				// check if either array is empty or category is selected
				return fil[1].length == 0 || fil[1].indexOf(d[fil[0]]) != -1;
			})) &&
		(dataFilters == null ||
			dataFilters.every(function (fil) {
				return d[fil] == "yes";
			}))
	);
}

function unique(arr, acc) {
	return arr.map(acc).filter(function (value, index, self) {
		return self.indexOf(value) === index;
	});
}

function formatText(str) {
	// capitalise and replace underscores by spaces
	// replace first letter
	str = str.slice(0, 1).toUpperCase() + str.slice(1);
	// find all underscores, replace by spaces and capitalise following letter
	while (str.indexOf("_") != -1) {
		str =
			str.slice(0, str.indexOf("_")) +
			" " +
			str
				.slice(str.indexOf("_") + 1, str.indexOf("_") + 2)
				.toUpperCase() +
			str.slice(str.indexOf("_") + 2);
	}
	return str;
}

function sentenceCase(str) {
	// capitalise first word and replace underscores by spaces
	// replace first letter
	str = str.slice(0, 1).toUpperCase() + str.slice(1);
	// find all underscores, replace by spaces and capitalise following letter
	while (str.indexOf("_") != -1) {
		str =
			str.slice(0, str.indexOf("_")) +
			" " +
			str.slice(str.indexOf("_") + 1);
	}
	return str;
}
