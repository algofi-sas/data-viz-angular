if [ $1 = "build" ]
then
    DOMAIN_URL=https://data-viz-v1.herokuapp.com/ grunt build
else
    DOMAIN_URL=https://data-viz-v1.herokuapp.com/ grunt serve
fi