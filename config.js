// specify the csv file containing your collection
const url = "papers.csv";

// specify your taxonomy
// Note: display labels will be automatically created by capitalising
// each word and replacing underscores with spaces.
const taxonomy = {
	facet_a: ["red", "blue"],
	facet_b: ["pears", "apples", "oranges"],
	facet_c: ["alpha", "beta", "gamma", "delta"],
};

// Uncomment this line and remove the above if you do not want to use a taxonomy
// const taxonomy = null;

// specify your tags
const tags = ["tag_1", "tag_2", "tag_3"];

// Uncomment this line and remove the above if you do not want to use tags
// const tags = null;

// modify this to change the text shown on each card
// (in between the image and the taxonomy tags)
function cardContent(div) {
	div.append("h2").text((d) => d.Title);
	div.append("span").html((d) =>
		[
			d.Author,
			". <i>",
			d["Publication Title"],
			"</i> (",
			d["Publication Year"],
			")",
			" <a href=" + d.URL + ' target="_blank">[Link]</a>',
			"<br>",
		].join("")
	);
}
