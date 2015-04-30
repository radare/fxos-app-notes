FILES=manifest.webapp img index.html

all:
	rm -f notes.zip
	zip -r notes.zip ${FILES}
