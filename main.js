// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)] 
  }
  
  // Returns a random single stand of DNA containing 15 bases
  const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
      newStrand.push(returnRandBase())
    }
    return newStrand
  }
  
  // my solution starts below
  const pAequorFactory = (number, strand) => { // this is the factory that produces the pAequor object
    return {
      specimenNum: number,
      dna: strand,
      mutate(){ // this randomly selects a base in the strand and changes it to a different letter; does this once
        const dna2change = Math.floor(Math.random() * strand.length);
        const dnaOriginal = this.dna[dna2change];
        while(this.dna[dna2change] === dnaOriginal) {
          this.dna[dna2change] = returnRandBase();
        };
        return this.dna;
      },
      compareDNA(pAequor2){ // this will compare this objects dna with another object given
        let compared = [];
        for(let i = 0; i < this.dna.length; i++) {
          if(this.dna[i] === pAequor2.dna[i]) {
            compared.push(1);
          } else {
            compared.push(0);
          }
        };
        const percent = Math.floor((compared.reduce((arr, curr) => arr + curr) / this.dna.length) * 100) + '%';
        console.log(`Specimen #${this.specimenNum} and specimen #${pAequor2.specimenNum} have ${percent} DNA in common.`);
      },
      willLikelySurvive(){ // this will return the chance of the dna to survive if 60% is made up of C and G bases
        let chance = [];
        this.dna.map(base => {
          if(base === 'C' || base === 'G') {
            chance.push(1);
          } else {
            chance.push(0);
          }
        });
        const percent2 = Math.floor((chance.reduce((arr, curr) => arr + curr) / this.dna.length) * 100);
        if(percent2 > 60) {
          return true;
        } else {
          return false;
        }
      },
      complimentStrand(){ // the extra challenge; creates the objects complementary DNA strand
        let compliment = [];
        for(i = 0; i < this.dna.length; i++) {
          if(this.dna[i] === 'A') {
            compliment.push('T');
          } else if(this.dna[i] === 'T') {
            compliment.push('A');
          } else if(this.dna[i] === 'C') {
            compliment.push('G');
          } else if(this.dna[i] === 'G') {
            compliment.push('C');
          }
        };
        return compliment;
      }
    }
  };
  
  const pAequorSurvivors = () => { // this will create 30 instances of the pAequor that have a chance of survival
    let pAequorGroup = [];
    for(let i = 0; i < 30; i++) {
      pAequorGroup.push(pAequorFactory((i + 1), mockUpStrand()));
      do {
        pAequorGroup[i] = pAequorFactory((i + 1), mockUpStrand());
      } while (pAequorGroup[i].willLikelySurvive() === false);
    };
    return pAequorGroup;
  };
  
  const group1 = pAequorSurvivors();
  //console.log(group1);
  
  const commonCheck = () => { // the extra challange to find the most related instances... from the group??
    for(i = 0; i < group1.length; i++) {
      for(j = 0; j < group1.length; j++) {
        group1[i].compareDNA(group1[j]);
      }
    }
  }

  //test for commit