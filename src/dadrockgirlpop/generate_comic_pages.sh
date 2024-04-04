INDEX='../../dadrockgirlpop/index.html'
echo '<b>DadRockGirlPop Webcomic</b><br><br>' > $INDEX

IMAGES='../../res/dadrockgirlpop/*'

for IMAGE in $IMAGES
do
  echo $IMAGE
  BASENAME=$(basename -- "$IMAGE")
  PAGEWITHZEROS=${BASENAME%.*}
  PAGE=`echo $PAGEWITHZEROS | awk '$0*=1'`
  NEXT=$((PAGE+1))
  DESTINATION="../../dadrockgirlpop/$PAGE.html"
  cat ./comicpagetemplate.html | sed "s,IMAGE,$IMAGE,g" | sed "s/PAGE/$PAGE/g" | sed "s/NEXT/$NEXT/g" > $DESTINATION
  echo '<a href="https://liveoverdrive.github.io/dadrockgirlpop/$PAGE.html">page $PAGE</a>' >> $INDEX
done
