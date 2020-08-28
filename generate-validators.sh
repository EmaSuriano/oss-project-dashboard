#!/usr/bin/env bash

DIR=$1

echo "Generating validators from $DIR ..."

for i in $(find $DIR -type f \( -iname "*.ts" ! -iname "*.validator.ts" \) ); 
do
    NAME=$(basename $i .ts)

    typescript-json-validator $DIR/$NAME.ts $NAME
    
    echo " - $NAME.validator.ts created!"
    # Fix for https://github.com/ForbesLindesay/typescript-json-validator/issues/34
    sed -i '' '/^export {/d' ./$DIR/$NAME.validator.ts
done