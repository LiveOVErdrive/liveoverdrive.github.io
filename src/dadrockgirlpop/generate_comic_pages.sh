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
done
