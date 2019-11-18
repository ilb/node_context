SRCXML=$(wildcard *.xml)
SRCPUML=$(wildcard *.puml)
all: xhtml dot svg puml

xhtml: $(patsubst %.xml,%.xhtml,$(SRCXML))
dot: $(patsubst %.xml,%.dot,$(SRCXML))
svg: $(patsubst %.xml,%.svg,$(SRCXML))
puml: $(patsubst %.puml,%.png,$(SRCPUML))

%.svg: %.dot
	dot -Tsvg $< -o $@

%.xhtml: %.xml
	xsltproc -o $@ $<

%.dot: %.xml
	xsltproc `grep xml-stylesheet havedev.xml |awk -F'"' '{print $$4}'|sed 's/xhtml/dot/'` $< >$@

%.png: %.puml
	plantuml $<
