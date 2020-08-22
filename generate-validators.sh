#!/usr/bin/env bash

echo "Generating validators from Types ..."

for i in $(find src/types -type f \( -iname "*.ts" ! -iname "*.validator.ts" \) ); 
do
    NAME=$(basename $i .ts)
    echo "Creating src/types/$NAME.validator.ts"

    typescript-json-validator src/types/$NAME.ts $NAME
    
    sed -i '' '/^export {/d' ./src/types/$NAME.validator.ts
done

echo "Validators generated!"