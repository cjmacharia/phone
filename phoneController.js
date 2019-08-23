
const fs = require('fs');
import store from 'store-js';
const numberGenerator = () => '0' + Math.floor(Math.random() * 900000000 + 100000000)

export const  generateNumbers = async (req, res) => {
    try {
        const NumberToGenerate = req.body.NumberToGenerate;
        if (NumberToGenerate > 10000) {
            res.status(400).json({message: 'Oops You have exceeded the 10,000  number generation limit'})
        }
        const phoneNumbers = await generateTheNumbers(NumberToGenerate, res);
        const numberResponse = JSON.parse(phoneNumbers);
        res.status(201).json({
            PhoneNumbers:
                {
                    message: `Successfully generated ${NumberToGenerate} numbers`,
                    totalNumbersGenerated: numberResponse.length,
                    largestGeneratedNumber: `0${Math.max.apply(null, numberResponse)}`,
                    smallestGeneratedNumber: `0${Math.min.apply(null, numberResponse)}`,
                    generateNumbers: numberResponse,
                }
        })
    } catch (err) {
    return err
    }
    }

const persistData = async (data, res) => {
    try {
        store.set('phonenumbers', JSON.stringify(data))
        const existingNumbers = store.get('phonenumbers');
        const parsedList = JSON.parse(existingNumbers)
        const newList = [...parsedList, ...data]
        if ((parsedList.length + data.length) > 10000) {
            res.status(400).json({message: 'Oops You cannot add more, you have exceeded limit'})
            return parsedList
        }
        const storedData = store.set('phonenumbers', JSON.stringify(newList))
        return storedData
    } catch (e) {
        return e

    }
}

export const generateTheNumbers = async(NumberToGenerate) => {
    try {
        const numberArray = [];
        for (let i = 0; i < NumberToGenerate; i++) {
            const number = numberGenerator();
            numberArray.push(number)
        }
        return persistData(numberArray);
    } catch (e) {
        return e
    }

}

export const  getNumbers = async (req, res) => {
    const existingNumbers = store.get('phonenumbers')
    const numberResponse = JSON.parse(existingNumbers);
    res.status(200).json({ PhoneNumbers:
            {
                numbersGenerated: numberResponse.length,
                largestGeneratedNumber: `0${Math.max.apply(null, numberResponse)}`,
                smallestGeneratedNumber:`0${Math.min.apply(null, numberResponse)}`,
                generateNumbers: numberResponse
            }
    })
}

export const  sortNumbersMax = (req, res) => {
    const existingNumbers = store.get('phonenumbers')
    const numberResponse = JSON.parse(existingNumbers);
    const sorted = numberResponse.sort(function(a, b){return a-b});
    res.status(200).json({ PhoneNumbers:
            {
                numbersGenerated: numberResponse.length,
                largestGeneratedNumber: `0${Math.max.apply(null, numberResponse)}`,
                smallestGeneratedNumber:`0${Math.min.apply(null, numberResponse)}`,
                generateNumbers: sorted
            }
    })
}

export const  sortNumbersMin = (req, res) => {
    const existingNumbers = store.get('phonenumbers')
    const numberResponse = JSON.parse(existingNumbers);
    const sorted = numberResponse.sort(function(a, b){return b-a});
    res.status(200).json({ PhoneNumbers:
            {
                numbersGenerated: numberResponse.length,
                largestGeneratedNumber: `0${Math.max.apply(null, numberResponse)}`,
                smallestGeneratedNumber:`0${Math.min.apply(null, numberResponse)}`,
                generateNumbers: sorted
            }
    })
}
export const deleteNumbers =(req, res) => {
    store.remove('phonenumbers')
    res.status(200).json({ message: 'Successfully cleared the phone number storage'
    })
}
export const  saveNumbersToFile  = (req, res) => {
    const existingNumbers = store.get('phonenumbers')
    const numberResponse = JSON.parse(existingNumbers);
    fs.writeFile(`${__dirname}/phonenumbers.txt`, numberResponse , (err) => {
        res.status(201).json({ message: 'successfully saved phone numbers to file storage'
        });

    })
}

