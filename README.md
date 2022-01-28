# Filterable Collection Template

This is a simple template for a website to show a filterable collection of some kind. It was originally built as a companion website for our survey on geospatial network visualization, see [geonetworks.github.io](https://geonetworks.github.io/).

## How to use it

This template uses the [D3.js](https://d3js.org/) and [Masonry](https://masonry.desandro.com/) libraries, but is otherwise just plain HTML, CSS and JavaScript, which you will some basic understanding of the be able to modify this template for your own use. The actual collection to be displayed is stored as a csv file.

**Steps:**

1. Fork this repository.
2. Create your data file based on `collection.csv`.

- Each item in your collection is one row.
- Each item can have an associated image. Images should go into the `img/` folder. In the csv file, specify the file name of your image (including the file extension) in the `image` column. If the `image` field is blank for an item, no image will be shown.
- Specify how each item has been classified. You can use the _taxonomy_ style, the _tag_ style, or both. Refer to the sample `collections.csv` and `config.js` to see how this works.
- _Hint:_ The format of the csv file is based on how Zotero exports citations to csv, i.e., if you are using this template for a collection of papers, you can create the collection in Zotero, export that to csv, and use it here. You just need to add an `image` column and columns for your taxonomy/tags. You can remove any columns you don't need to reduce the file size.

3. Open `config.js` and specify the following things:

- The name of your data file (default is `collection.csv`)
- Your _taxonomy_ and/or your _tags_. If you set either `taxonomy` or `tags` to `null`, the respective filtering UI will not be shown in the sidebar. The labels you specify for your facet names, the categories within them, and your tags, **must** match the labels used in your csv file exactly.
- Optional: Modify the text shown on each card by updating the `cardContent` function. This will be necessary if your collection is anything other than a collection of academic papers.

4. Modify `index.html` to adapt the title, subtitle, links, etc. to your own content. There are comments in the places you might want to update.
5. (optional) Modify `style.css` to change e.g. the background colour or fonts. You could also change the width of the columns the 'cards' are shown in.

## List of websites that use this template:

- [Geospatial Network Visualization](https://geonetworks.github.io/)
- [COVID19 Trackers Library](https://dbhatedin.github.io/CuratedTrackersLibrary/)

## Questions, comments, requests?

I'm happy to try and help. Find my contact details here: [sarahschoettler.com](https://sarahschoettler.com/)
