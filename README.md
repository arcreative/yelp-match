# yelp-match

Simple batch tool for finding closest yelp results and ratings.  There has never
been a comprehensive way of getting Yelp ratings for tabular data, such as
a list of doctors or dentists.  I needed this for just that purpose recently,
and it works pretty well for such a task.

## Usage

#### Syntax
```sh
npm install
node index.js dentists.csv
```

#### dentists.csv
```csv
Anthony Daniel
Robert Chong
Pastel Dental
Leo Arellano
```
#### output
```csv
"name","matched_name","rating","url","phone"
"Anthony Daniel","City Arts & Lectures","4.5","http://www.yelp.com/biz/city-arts-and-lectures-san-francisco","4155632463"
"Robert Chong","CAAMFest","5","http://www.yelp.com/biz/caamfest-san-francisco","4158630814"
"Pastel Dental","Miette","4","http://www.yelp.com/biz/miette-san-francisco-4","4156266221"
"Leo Arellano"
```

## Contributions

Clearly this was a 1 hour hack, but if you want to contribute, you're more than welcome :-)