#!/bin/bash

# Script to generate UML diagram images from PlantUML code
# This will create PNG images that can be embedded in PDF

echo "Generating UML diagram images..."

# Create images directory
mkdir -p uml_images

# Install PlantUML if not available
if ! command -v plantuml &> /dev/null; then
    echo "PlantUML not found. Installing..."
    # For Ubuntu/Debian
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y plantuml
    # For macOS
    elif command -v brew &> /dev/null; then
        brew install plantuml
    else
        echo "Please install PlantUML manually from http://plantuml.com/download"
        exit 1
    fi
fi

# Extract PlantUML code blocks and generate images
counter=1
in_plantuml=false
plantuml_code=""
diagram_name=""

while IFS= read -r line; do
    if [[ "$line" == \`\`\`plantuml ]]; then
        in_plantuml=true
        plantuml_code=""
        diagram_name="diagram_${counter}"
        ((counter++))
    elif [[ "$line" == \`\`\` ]] && [ "$in_plantuml" = true ]; then
        in_plantuml=false
        echo "$plantuml_code" > "uml_images/${diagram_name}.puml"
        plantuml -tpng "uml_images/${diagram_name}.puml" -o "$(pwd)/uml_images"
        echo "Generated: uml_images/${diagram_name}.png"
    elif [ "$in_plantuml" = true ]; then
        plantuml_code+="$line"$'\n'
    fi
done < "UML_DIAGRAMS_LANGUAGE_OCR.md"

echo "All diagrams generated in uml_images/ directory"
echo "Now run: npm install -g md-to-pdf"
echo "Then: md-to-pdf UML_DIAGRAMS_LANGUAGE_OCR.md"

